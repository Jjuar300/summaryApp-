import SpaceModal from "../../../components/Modal";

export default function SpaceModals({
  setOpenModal,
  isOpenModal,
  textFieldStyle,
  MobileSpaceModal,
  LengthOfText,
  handleCloseEditSpace,
  handleEditChange,
  setRenameSpaceOpen,
  isRenameSpaceOpen,
  editText,
  LengthOfEditText,
  handleChange,
  handleCloseSave,
}) {
  return (
    <>
      <SpaceModal
        onClick={handleCloseSave}
        onChange={handleChange}
        textQuestion={"Create a new Space"}
        isText={true}
        inputStyle={textFieldStyle}
        isInput={true}
        isOpen={isOpenModal}
        textLeftButton={"Cancel"}
        textRightButton={"Save"}
        setOpen={setOpenModal}
        inlineStyle={MobileSpaceModal}
        textCount={LengthOfText}
      />

      <SpaceModal
        onClick={handleCloseEditSpace}
        onChange={handleEditChange}
        setOpen={setRenameSpaceOpen}
        textQuestion={"Edit Space"}
        textLeftButton={"Cancel"}
        textRightButton={"Save"}
        isInput={true}
        isOpen={isRenameSpaceOpen}
        inlineStyle={MobileSpaceModal}
        inputStyle={textFieldStyle}
        isText={true}
        previousText={editText}
        textCount={LengthOfEditText}
      />
    </>
  );
}
