import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

import getCroppedImg from '../../../functions/function'
/* ===================================================================== */
const IconCropper = ({ getBlob, inputImg }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = async (_, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(inputImg, croppedAreaPixels)
    getBlob(croppedImage)
  }

  return (
    <Cropper
      image={inputImg}
      cropShape="round"
      crop={crop}
      zoom={zoom}
      aspect={1}
      showGrid={false}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  )
}
export default IconCropper
