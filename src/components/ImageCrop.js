import React, {useState, useContext} from 'react'
import {
    Button,
    Form,
    Modal,
    Image,
    Dimmer,
    Loader,
    Input,
    Icon
} from "semantic-ui-react"
import {connect} from "react-redux"
import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';

export const CropImage = (props) => {
    const [photo,setPhoto] = useState(null)
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [open,setOpen] = useState(false);
    const [finishCrop,setFinishCrop] = useState(false);
    const [crop,cropSetter] = useState({
        aspect: 1/1,
    });

    return (
        <Modal
            closeIcon={< Icon name = 'close' onClick = {
            () => setOpen(false)
        } > </Icon>}
            open={open}
            trigger={< Button onClick = {
            () => setOpen(true)
        } > Change Photo </Button>}>
            <Modal.Header>
                <h1>Change Profile Pic</h1>
            </Modal.Header>
            <Modal.Content>
                {loading
                    ? <Dimmer active>
                            <Loader/>
                        </Dimmer>
                    : null}
                <Form 
                onSubmit={() =>  {
                    const croppedImageUrl = getCroppedImg(
                        photo,
                        crop,
                        'newFile.jpeg'
                    );
                    setPhoto(croppedImageUrl);
                    setOpen(false);
                    setLoading(false);
                }}>
                    <Form.Field>
                        <Input>
                            <div>
                                <ReactCrop 
                                src = {photo} 
                                crop = {crop} 
                                onChange = {(new_crop) =>cropSetter(new_crop)}
                                onImageLoaded = {handleImageLoaded}
                                onComplete = {handleOnCropComplete}
                                circularCrop = {true}
                                />
                            </div>

                            <input type='file' accept="image/png, image/jpeg" onChange={(event) => {
                            let fr = new FileReader()

                            if(event?.target?.files?.[0]){
                                fr.readAsDataURL(event.target.files[0])
                            }
                            fr.onload = () => {
                                setPhoto(fr.result);
                            }
                            }}> 
                            </input>
                        </Input>
                    <div>
                        <Button type='submit'>Submit</Button>
                    </div>

                    </Form.Field>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

const handleImageLoaded = (image) =>{
    console.log(image)
}

const handleOnCropComplete = (crop, pixelCrop) => {
     console.log(crop,pixelCrop);
    //  isFinished(true);
}

const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
}


const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        profile: state.auth.profile,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(CropImage);