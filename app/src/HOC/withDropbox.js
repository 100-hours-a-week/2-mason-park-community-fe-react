import {useEffect, useRef, useState} from "react";
import ProfileImage from "../components/common/ProfileImage";
import Dropbox from "../components/Dropbox/Dropbox";

const withDropbox = (WrappedComponent) => {
    return (props) => {
        const dropboxRef = useRef(null);
        const [isOpen, setIsOpen] = useState(false);
        const toggleDropdown = () => {
            setIsOpen((prev) => !prev);
        }

        useEffect(() => {
            const handleOutsideClose = (e) => {
                if (isOpen && !dropboxRef.current.contains(e.target)) setIsOpen(false);
            }
            document.addEventListener("click", handleOutsideClose);

            return () => document.removeEventListener("click", handleOutsideClose);
        }, [isOpen])

        return (
            <div ref={dropboxRef} className={'profile'} style={{ position: "relative", width: '35px' }} onClick={toggleDropdown}>
                <WrappedComponent {...props} />
                {isOpen && <Dropbox {...props} />}
            </div>
        )
    }
}

const ProfileImageWithDropbox = withDropbox(ProfileImage);

export default ProfileImageWithDropbox;