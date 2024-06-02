export default function Modal({ isOpen, onClose, children }) {
    /*
    Need to be a wrap with a close button
    maybe we can have the possibility to add specific section liek slot in svetle (content + buttons bottom -optional)
    Should render a component inside
    */
    if (isOpen) {
        return (
            <div id={"Overlay"}>
                <div className={"overlayWindow"}>
                    <div className={"topBar"}>
                        <span onClick={onClose}>X</span>
                    </div>
                    {children}
                </div>
            </div>
        );
    }
}
