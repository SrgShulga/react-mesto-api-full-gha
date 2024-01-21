import PopupWithForm from "./PopupWithForm"

function PopupWithConfirm (props) {
  
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      id='delete-popup'
      title='Вы уверены?'
      name='cardDelete'
      buttonText='Да'
    >
    </PopupWithForm>
  )
};

export default PopupWithConfirm;