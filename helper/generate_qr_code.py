import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers.pil import HorizontalBarsDrawer
from qrcode.image.styles.colormasks import RadialGradiantColorMask


def main():
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)
    qr.add_data("https://literallytheone.github.io/tutorials/pytorch/docs/0-intro/")

    img_1 = qr.make_image(
        image_factory=StyledPilImage,
        color_mask=RadialGradiantColorMask(),
        module_drawer=HorizontalBarsDrawer(),
        embedded_image_path="../site/static/android-chrome-512x512.png",
        fit=True,
    )
    img_1.save("qr-code-1.webp")


if __name__ == "__main__":
    main()
