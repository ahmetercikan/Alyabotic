#!/usr/bin/env python3
"""
Alyabotic PNG Icon Generator
Generates PNG icons from SVG for PWA support
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_gradient_circle(size):
    """Create a circular gradient background"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Draw gradient circle (simplified - solid purple)
    center = size // 2
    radius = size // 2 - 10

    # Draw main circle with purple color
    draw.ellipse(
        [(10, 10), (size-10, size-10)],
        fill='#8B5CF6'
    )

    return img, draw

def draw_robot_icon(img, draw, size):
    """Draw robot/code icon on the image"""
    # White color for robot parts
    white = (255, 255, 255, 230)
    purple = (139, 92, 246, 255)
    orange = (245, 158, 11, 255)

    # Head
    head_size = int(size * 0.3)
    head_x = size // 2 - head_size // 2
    head_y = int(size * 0.23)
    draw.rounded_rectangle(
        [(head_x, head_y), (head_x + head_size, head_y + int(head_size * 0.8))],
        radius=10,
        fill=white
    )

    # Eyes
    eye_radius = int(size * 0.03)
    draw.ellipse(
        [(int(size * 0.4) - eye_radius, int(size * 0.33) - eye_radius),
         (int(size * 0.4) + eye_radius, int(size * 0.33) + eye_radius)],
        fill=purple
    )
    draw.ellipse(
        [(int(size * 0.6) - eye_radius, int(size * 0.33) - eye_radius),
         (int(size * 0.6) + eye_radius, int(size * 0.33) + eye_radius)],
        fill=purple
    )

    # Antenna
    antenna_y = head_y - int(size * 0.05)
    draw.line(
        [(size // 2, antenna_y), (size // 2, head_y)],
        fill=white,
        width=int(size * 0.015)
    )
    antenna_ball = int(size * 0.025)
    draw.ellipse(
        [(size // 2 - antenna_ball, antenna_y - antenna_ball),
         (size // 2 + antenna_ball, antenna_y + antenna_ball)],
        fill=orange
    )

    # Body
    body_width = int(size * 0.22)
    body_height = int(size * 0.27)
    body_x = size // 2 - body_width // 2
    body_y = int(size * 0.51)
    draw.rounded_rectangle(
        [(body_x, body_y), (body_x + body_width, body_y + body_height)],
        radius=8,
        fill=white
    )

    # Code lines on body
    line_width = int(size * 0.012)
    line_y = body_y + int(size * 0.06)

    # Purple line
    draw.line(
        [(body_x + int(size * 0.04), line_y),
         (body_x + body_width - int(size * 0.04), line_y)],
        fill=purple,
        width=line_width
    )

    # Pink line
    draw.line(
        [(body_x + int(size * 0.04), line_y + int(size * 0.06)),
         (body_x + body_width - int(size * 0.02), line_y + int(size * 0.06))],
        fill=(236, 72, 153, 255),
        width=line_width
    )

    # Orange line
    draw.line(
        [(body_x + int(size * 0.04), line_y + int(size * 0.12)),
         (body_x + body_width - int(size * 0.06), line_y + int(size * 0.12))],
        fill=orange,
        width=line_width
    )

    # Arms
    arm_width = int(size * 0.08)
    arm_height = int(size * 0.16)
    arm_y = int(size * 0.55)

    # Left arm
    draw.rounded_rectangle(
        [(int(size * 0.27), arm_y),
         (int(size * 0.27) + arm_width, arm_y + arm_height)],
        radius=5,
        fill=white
    )

    # Right arm
    draw.rounded_rectangle(
        [(int(size * 0.65), arm_y),
         (int(size * 0.65) + arm_width, arm_y + arm_height)],
        radius=5,
        fill=white
    )

    # Add text "</>" on head
    try:
        font_size = int(size * 0.08)
        # Try to use a monospace font, fallback to default if not available
        try:
            font = ImageFont.truetype("consola.ttf", font_size)
        except:
            font = ImageFont.load_default()

        text = "</>"
        # Get text bbox
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_x = size // 2 - text_width // 2
        text_y = head_y + int(head_size * 0.55)

        draw.text((text_x, text_y), text, fill=purple, font=font)
    except:
        # If font fails, just skip the text
        pass

    return img

def generate_icon(size, output_path):
    """Generate a single icon of specified size"""
    img, draw = create_gradient_circle(size)
    img = draw_robot_icon(img, draw, size)

    # Save the icon
    img.save(output_path, 'PNG', optimize=True)
    print(f"Created {output_path} ({size}x{size})")

def main():
    """Generate all required icon sizes"""
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    output_dir = "public"

    print("Alyabotic Icon Generator")
    print("=" * 50)

    # Check if Pillow is installed
    try:
        import PIL
        print(f"PIL/Pillow version: {PIL.__version__}")
    except ImportError:
        print("ERROR: Pillow is not installed!")
        print("Install it with: pip install Pillow")
        return

    print(f"\nGenerating {len(sizes)} icon sizes...")
    print("-" * 50)

    for size in sizes:
        output_path = os.path.join(output_dir, f"icon-{size}x{size}.png")
        generate_icon(size, output_path)

    print("-" * 50)
    print(f"Successfully generated {len(sizes)} icons!")
    print("\nGenerated files:")
    for size in sizes:
        print(f"  - public/icon-{size}x{size}.png")

    print("\nNext steps:")
    print("1. Commit the changes: git add public/icon-*.png")
    print("2. Push to GitHub: git push origin main")
    print("3. Deploy: npm run deploy")
    print("\nDone! Your PWA icons are ready!")

if __name__ == "__main__":
    main()
