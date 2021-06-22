import React from 'react'
import axios from 'axios'
import {Button} from './Button'
import {toast, ToastContainer} from "react-toastify";

const backendURL = "http://localhost"

class ImageUpload extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedImage: undefined,
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        this.setState({
            selectedImage: event.target.files[0]
        })
    }

    submit() {
        console.log(this.state.selectedImage)
        if (this.state.selectedImage !== undefined) {

            // deleteUserImages
            let axiosConfig1 = {
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                    'Accept': 'Token',
                    "Access-Control-Allow-Origin": "*",
                    'token' : localStorage.getItem("token")
                }
            };
            try {
                axios.post( `${backendURL}:5000/deleteUserImages`,{}, axiosConfig1)
                    .then(res =>
                        {
                            console.log(res.data);
                            const data = new FormData()
                            data.append('file', this.state.selectedImage)
                            let axiosConfig = {
                                headers: {
                                    'Content-Type' : 'application/json; charset=UTF-8',
                                    'Accept': 'Token',
                                    "Access-Control-Allow-Origin": "*",
                                    'token' : localStorage.getItem("token")
                                }
                            };
                            console.log(this.state.selectedImage)
                            let url = `${backendURL}:5000/upload`

                            axios.post(url, data, axiosConfig)
                                .then(res2 => {
                                    if (res2.data["success"]) {
                                        toast.dark(
                                            "Success",
                                            {
                                                position: "bottom-right",
                                                autoClose: 10000,
                                                draggable: true
                                            }
                                        )
                                    } else {
                                        toast.error(
                                            "Failed to upload image!",
                                            {
                                                position: "bottom-right",
                                                autoClose: 10000,
                                                draggable: true
                                            }
                                        )
                                    }
                                })
                            .catch(err => {
                                console.log(err)
                                toast.error(
                                    "Failed to upload image!",
                                    {
                                        position: "bottom-right",
                                        autoClose: 10000,
                                        draggable: true
                                    }
                                )
                            })
                        }
                    )
                    .catch(err => {
                        console.log("!!!No connection...!!!")
                        this.setState({error: true})
                        toast.error(
                            "Failed to upload image!",
                            {
                                position: "bottom-right",
                                autoClose: 10000,
                                draggable: true
                            }
                        )
                    })
            } catch (error) {
                console.log("!!!No connection...!!!")
                this.setState({error: true})
            }
        } else {
            toast.info(
                "Please select an image!",
                {
                    position: "bottom-right",
                    autoClose: 10000,
                    draggable: true
                }
            )
        }
    }

    render() {
        return (
            <div>
                <h1>Upload your image now!</h1>
                <ToastContainer/>
                <form>
                    <h2>Select your file:</h2>
                    <input type="file" name='upload_file' onChange={this.handleInputChange}/>
                </form>
                <Button onClick={() => this.submit()} buttonStyle='btn--inverted'>Submit</Button>
            </div>
        );
    }
}

export default ImageUpload