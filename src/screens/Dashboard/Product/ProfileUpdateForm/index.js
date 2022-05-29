import React, { useEffect, useState } from 'react'
import DashboardFormField from '../../DashboardComponents/DashboardFormField'
import { DashboardFormDropDownList } from '../../DashboardFormFieldDropList'
import { ReactComponent as Loader } from '../../../../assets/spinner.svg'
import ProfileImageUploader from '../../DashboardComponents/ProfileImageUploader'
import { city_list, country_list } from './data'
import { auth } from '../../../../config/firebase'
import { findSetListValue, updateUser, uploadProfileImageAsync } from '../../../../functions/authFunctions'
import { useAlert } from '../../../../GlobalContexts/ErrorContext'
import { useAuth } from '../../../../GlobalContexts/AuthProvider'
import { connect } from 'react-redux'
import { setUserData } from '../../../../redux/actions'
import SearchAddressPallete from '../../../../Components/CommandPalletes/SearchAddressPallete'
import { emptyStringIfUNDEFINED } from '../../../../functions/paymentFunctions'




const ProfileUpdateForm = ({updateUserState, user}) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setphone] = useState('')
    const [city, setCity] = useState(city_list[0])
    const [country, setCountry] = useState(country_list[0])
    const [addressObj, setAddressObj] = useState(null)
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const [uid, setUid] = useState(null)
    const [email, setEmail] = useState('')
    const [imageUri, setImageUri] = useState('')
    const [openModal, setOpenModal] = useState(false)



    const alert = useAlert()

    useEffect(() => {
        if(user && auth.currentUser){
            setUid(user?.uid)
            setUsername(user.username? user.username : user.displayName)
            setName(user.fullName)
            setphone(user.phone)
            setAddress(user?.address)
            setCity(findSetListValue(city_list, user?.city))
            setCountry(findSetListValue(country_list, user?.country))
            setImageUri(auth.currentUser?.photoURL)
            setAddressObj({ ...user.extra, postal_code: user.extra?.postalCode, latlon: { lng: user.extra?.longitude, lat: user.extra?.latitude } })
            setEmail(auth.currentUser.email)
        }
        console.log(user)
    }, [])

    const handleOnSave = () => {

        if (username === '' || name === '' || address === '' || phone === '' || address === '') {
            alert.setalert({ title: 'Missing Fields Error!', body: 'please provide all required information to continue.', type: 'error' })
            return
        }

        const data = {
            uid,
            displayName: username,
            phone,
            city: city.value,
            state: city.value,
            country: emptyStringIfUNDEFINED(country.value),
            email,
            address,
            extra: {
                city: city.value,
                longitude: addressObj.latlon.lng,
                latitude: addressObj.latlon.lat,
                postalCode: emptyStringIfUNDEFINED(addressObj.postal_code)
            },
            fullName: name,
            imageUri,
        }
        setLoading(true)
        updateUser(data).then(() => {
            auth.currentUser.updateProfile(
                {
                    phoneNumber: phone,
                    displayName: username,
                    photoURL: imageUri
                }
            ).then(() => {
                (async () => {
                    addressObj['country'] = country.value
                    addressObj['city'] = city.value
                    addressObj['address'] = address
                    const newData = {
                        ...user,
                        username,
                        phone,
                        fullName: name,
                        avatar: imageUri,
                        phone,
                        city: city.value,
                        state: city.value,
                        country: country.value,
                        delivery_address: addressObj
                    }
                    await updateUserState(newData)

                })().then(() => {
                    setLoading(false)
                    alert.setalert({ title: 'Success!', body: 'your Pickr profile has been updated successfully..', type: 'success' })
                }).catch((e) => {
                    alert.setalert({ title: 'Error!', body: 'an error occured, try again!', type: 'error' })
                })

            })
        })


    }

    const getAddress = (address) => {
        setAddress(address.address)
        setCountry(findSetListValue(country_list, address.country))
        setCity(findSetListValue(city_list, address.city))
        setAddressObj(address)
        // console.log(address)
        setOpenModal(false)
    }


    return (
        <div className='w-full'>
            <SearchAddressPallete open={openModal} setOpen={setOpenModal} handleAction={getAddress} />
            <ProfileImageUploader uri={imageUri} setUri={setImageUri} uid={uid} />
            <DashboardFormField name="User Name" placeholder="e.g. BigJohnD" text={username} setText={setUsername} />
            <DashboardFormField name="Full Name" placeholder="e.g. John Daniel Doe" text={name} setText={setName} />
            <DashboardFormField name="Mobile Phone" placeholder="e.g. +905331234567" text={phone} setText={setphone} />
            <div onClick={() => setOpenModal(true)}><DashboardFormField name="Address" placeholder="e.g. door 12, apt 1, street." text={address} setText={setAddress} /></div>
            <DashboardFormDropDownList list={city_list} selectedInterval={city} setSelectedInterval={setCity} name="City" />
            <DashboardFormDropDownList list={country_list} selectedInterval={country} setSelectedInterval={setCountry} name="Country" />

            <div onClick={() => handleOnSave()} className={`w-auto h-12 cursor-pointer flex justify-center items-center rounded-xl  mx-2 my-4 space-x-2  ${loading ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-500'}`}>
                {loading && <Loader className='w-4 h-4 animate-spin' />}
                <span className="font-medium text-white cursor-pointer">Save</span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserState: (data) => dispatch(setUserData(data))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdateForm)