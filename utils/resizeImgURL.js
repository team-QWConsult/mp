export default function resizeImgURL(
  url,
  width,
  watermark = "Elroi Properties"
) {
  let firstPart = url.split("upload")[0];
  let secondPart = url.split("upload")[1];

  return `${firstPart}upload/w_${width}/l_text:Arial_24_bold:${encodeURIComponent(
    watermark
  )},co_rgb:FFFFFF${secondPart}`;
}
