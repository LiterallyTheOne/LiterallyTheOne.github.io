# %%
# -------------------[ Imports ]-------------------
from pathlib import Path

import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.colormasks import RadialGradiantColorMask
from qrcode.image.styles.moduledrawers.pil import HorizontalBarsDrawer

# %%
# -------------------[ Config and setup ]-------------------
CURRENT_DIR = Path(__file__).parent

URL_PATH = (
    "https://literallytheone.github.io/tutorials/keras/docs/3-plot-and-tensorboard/"
)

EMBEDDED_IMAGE_PATH = CURRENT_DIR.parent / "site/static/android-chrome-512x512.png"

RESULT_PATH = CURRENT_DIR / "qr-code-1.webp"

# %%
# -------------------[ Create QR Code ]-------------------

qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)
qr.add_data(URL_PATH)

img_1 = qr.make_image(
    image_factory=StyledPilImage,
    color_mask=RadialGradiantColorMask(),
    module_drawer=HorizontalBarsDrawer(),
    embedded_image_path="../site/static/android-chrome-512x512.png",
    fit=True,
)

# %%
# -------------------[ Save the qr code ]-------------------
img_1.save("qr-code-1.webp")

# %%
# -------------------[ Ramin Zarebidoky ]-------------------
# -------------------[ LiterallyTheOne.github.io ]-------------------
