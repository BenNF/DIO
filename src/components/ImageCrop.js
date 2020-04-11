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
                        props.photo,
                        crop,
                        'newFile.jpeg'
                    );
                    props.setPhoto(croppedImageUrl);
                    setOpen(false);
                    setLoading(false);
                }}>
                    <Form.Field>
                        <Input>
                            <div>
                                <ReactCrop 
                                src = {props.photo} 
                                crop = {crop} 
                                onChange = {(new_crop) =>cropSetter(new_crop)}
                                onImageLoaded = {handleImageLoaded}
                                circularCrop = {true}
                                />
                            </div>

                            <input type='file' accept="image/png, image/jpeg" onChange={(event) => {
                            let fr = new FileReader()

                            if(event?.target?.files?.[0]){
                                fr.readAsDataURL(event.target.files[0])
                            }
                            fr.onload = () => {
                                props.setPhoto(fr.result);
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
    
}


const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const canvas2 = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    const ctx2 = canvas.getContext('2d');
    // I am passing in a data URI image and not a HTML image
    console.log(image)
    let new_img = document.createElement('img')
    console.log(new_img)
    new_img.onload = () => { ctx2.drawImage(new_img, 0,0)}
    new_img.src = image
    ctx.drawImage(
      canvas2,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    console.log(ctx2)

    return(
        canvas.toDataURL()
    )
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