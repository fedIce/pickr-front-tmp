import React, { useState } from 'react'
import { storage } from '../../../../config/firebase'
import { useAlert } from '../../../../GlobalContexts/ErrorContext'
import { ReactComponent as Loader } from '../../../../assets/spinner.svg'



const ProfileImageUploader = ({ uid, uri, setUri }) => {

    const alert = useAlert()

    const [loading, setLoading] = useState(false)

    const uploadProfileImageAsync = async (data) => {
        setLoading(true)
        let ref = storage
            .ref(`profile/${uid}`).put(data)
        ref.on("state_changed", (snapshot) => {
            // console.log((snapshot.bytesTransferred - snapshot.totalBytes)/100)
        },
            (error) => {
                alert.setalert({ title: 'Image Upload failed', body: 'something went wrong while uploading your profile image', type: 'error' })
            },
            () => {
                ref.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setUri(downloadURL)
                    setLoading(false)
                })
            })

    }


    return (
        <div className="flex items-center space-x-6 my-10">
            <div className="shrink-0">
                <img className="h-16 w-16 object-cover rounded-full" src={uri} alt="Current profile photo" />
            </div>
            <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input type="file" className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100
                            "
                    onChange={e => uploadProfileImageAsync(e.target.files[0])} />
            </label>
            {loading && <Loader className='w-6 h-6 animate-spin' />}
        </div>
    )
}

export default ProfileImageUploader