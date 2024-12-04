import {useState} from "react";
import ProfileImage from "../components/common/ProfileImage";
import Dropbox from "../components/Dropbox/Dropbox";

const withDropbox = (WrappedComponent) => {
    return (props) => {
        const [isOpen, setIsOpen] = useState(false);
        const toggleDropdown = () => {
            setIsOpen((prev) => !prev);
        }

        return (
            <div className={'profile'} style={{ position: "relative", width: '35px' }} onClick={toggleDropdown}>
                <WrappedComponent {...props} />
                {isOpen && <Dropbox {...props} />}
            </div>
        )
    }
}

const ProfileImageWithDropbox = withDropbox(ProfileImage);

export default ProfileImageWithDropbox;