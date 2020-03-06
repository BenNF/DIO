import {SetProfile} from "../actions/authActions";
import React, {useContext, useState, PureComponent} from "react"
import {Form, Image, Button, Input, TextArea} from "semantic-ui-react"
import {connect} from "react-redux"
import {FirebaseContext} from "../store/Firebase"
import {Redirect} from "react-router-dom"
import {LOGIN,PROFILE} from "../routing/routes"
// import PureComponent
import ReactDOM from "react-dom";
import ReactCrop from "react-image-crop";

import "./styles.css"

//class App extends PureComponent {
//     state = {
//       src: null,
//       crop: {
//         unit: "%",
//         width: 30,
//         aspect: 1 / 1
//       }
//     };
  
//     onSelectFile = e => {
//       if (e.target.files && e.target.files.length > 0) {
//         const reader = new FileReader();
//         reader.addEventListener("load", () =>
//           this.setState({ src: reader.result })
//         );
//         reader.readAsDataURL(e.target.files[0]);
//       }
//     };
  
//     // If you setState the crop in here you should return false.
//     onImageLoaded = image => {
//       this.imageRef = image;
//     };
  
//     onCropComplete = crop => {
//       this.makeClientCrop(crop);
//     };
  
//     onCropChange = (crop, percentCrop) => {
//       // You could also use percentCrop:
//       // this.setState({ crop: percentCrop });
//       this.setState({ crop });
//     };
  
//     async makeClientCrop(crop) {
//       if (this.imageRef && crop.width && crop.height) {
//         const croppedImageUrl = await this.getCroppedImg(
//           this.imageRef,
//           crop,
//           "newFile.jpeg"
//         );
//         this.setState({ croppedImageUrl });
//       }
//     }
  
//     getCroppedImg(image, crop, fileName) {
//       const canvas = document.createElement("canvas");
//       const scaleX = image.naturalWidth / image.width;
//       const scaleY = image.naturalHeight / image.height;
//       canvas.width = crop.width;
//       canvas.height = crop.height;
//       const ctx = canvas.getContext("2d");
  
//       ctx.drawImage(
//         image,
//         crop.x * scaleX,
//         crop.y * scaleY,
//         crop.width * scaleX,
//         crop.height * scaleY,
//         0,
//         0,
//         crop.width,
//         crop.height
//       );
  
//       return new Promise((resolve, reject) => {
//         canvas.toBlob(blob => {
//           if (!blob) {
//             //reject(new Error('Canvas is empty'));
//             console.error("Canvas is empty");
//             return;
//           }
//           blob.name = fileName;
//           window.URL.revokeObjectURL(this.fileUrl);
//           this.fileUrl = window.URL.createObjectURL(blob);
//           resolve(this.fileUrl);
//         }, "image/jpeg");
//       });
//     }
  
//     render() {
//       const { crop, croppedImageUrl, src } = this.state;
  
//       return (
//         <div className="App">
//           <div>
//             <input type="file" accept="image/*" onChange={this.onSelectFile} />
//           </div>
//           {src && (
//             <ReactCrop
//               src={src}
//               crop={crop}
//               ruleOfThirds
//               onImageLoaded={this.onImageLoaded}
//               onComplete={this.onCropComplete}
//               onChange={this.onCropChange}
//             />
//           )}
//           {croppedImageUrl && (
//             <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
//           )}
//         </div>
//       );
//     }
//   }

// ReactDOM.render(<App />, document.getElementById("root"));



const Account = (props) => {
    const [photo, setPhoto] = useState(props.profile.profilePic)
    const [didUpdate, setUpdate] = useState(false);
    const [bio, setBio] = useState(props.profile.bio)
    const firebase = useContext(FirebaseContext);

    const crop_state = {
        src: null,
        crop: {
          unit: "%",
          width: 30,
          aspect: 1 / 1
        }
      };

      const onImageLoaded = image => {
        this.imageRef = image;
      };
    
      const onCropComplete = crop => {
        this.makeClientCrop(crop);
      };
    
      const onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
      };

    return (
        <div className='editProfile'>
            {props.login ? null : <Redirect to={LOGIN}/>}
            {didUpdate ? <Redirect to={PROFILE}/> : null}
            <div className='editFormbox'>
                <h1>New Edits</h1>
                <Form onSubmit={(event) => handleSubmit(event, firebase, photo, props.profile.uid, setUpdate)}>
                    <Form.Field>
                        <label>Bio</label>
                        <TextArea value ={bio} onChange = {(event, value) => setBio(event.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name...' value={props.profile.name}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Location</label>
                        <input placeholder='City...' value={props.profile.location}/>
                    </Form.Field>
                    <Form.Field>
                        <Image src={photo} size='small'></Image>
                        <Input>
                            <input type='file' accept="image/png, image/jpeg" onChange={(event) => {
                            let fr = new FileReader()
                            if(event?.target?.files?.[0]){
                                fr.readAsDataURL(event.target.files[0])
                            }
                            // Adding image cropper here

                            fr.onload = () => {
                            //     (<ReactCrop
                            //     src = {crop_state}
                            //     crop={crop_state.crop}
                            //     ruleOfThirds
                            //     onImageLoaded={this.onImageLoaded}
                            //     onComplete={this.onCropComplete}
                            //     onChange={this.onCropChange}
                            //   />)
                                setPhoto(fr.result);
                            }
                        }}></input>
                        </Input>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        </div>
    )
}




const handleSubmit = (event, firebase, photo, uid, setUpdate) => {
    event.preventDefault();
    console.log(event.target)
    const bio = (event.target[0].value);
    const name = (event.target[1].value);
    const location = (event.target[2].value);
    firebase.doUploadImage(photo, uid).then(result => {
        result.ref.getDownloadURL().then(url => {
            const profile = {
                bio,
                name,
                location,
                profilePic: url
            }
            firebase.doUpdateUserProfile(uid, profile).then(()=> {
                console.log("SUCCESS") //do something for user feedback here
                setUpdate(true)
            }).catch(error =>console.log(error))
        }).catch(error => console.log(error))
    }).catch(error=> console.log(error))
}

const mapStateToProps = (state) => {
    return {
        profile: state.auth.profile,
        login: state.auth.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProfile: (profile) => dispatch(SetProfile(profile))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);