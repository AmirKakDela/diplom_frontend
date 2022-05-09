import React, {useMemo} from "react";
import {Input, Modal} from "antd";
import {Formik} from "formik";

import "./EditPlaylistModal.scss"
import {EditPlaylistType, PlaylistType} from "../../../../config/types";


interface EditPlaylistModalProps {
    visible: boolean;
    onEdit: (values: PlaylistType) => void;
    onCancel: () => void;
    playlist: PlaylistType
    theme: string
}

const EditPlaylistModal: React.FC<EditPlaylistModalProps> = ({
                                                                 visible,
                                                                 onEdit,
                                                                 onCancel,
                                                                 playlist,
                                                                 theme
                                                             }) => {
    const initialValues: EditPlaylistType = useMemo(() => {
        return {
            name: playlist.name,
            cover: playlist.cover,
            description: playlist.description
        }
    }, [playlist]);

    const onSubmit = (data: any) => {
        onEdit(data)
    }

    return (
        <Modal
            className={`edit_playlist__modal _${theme}`}
            visible={visible}
            title="Изменить сведения"
            cancelText="Cancel"
            onCancel={onCancel
            }
            footer={[]}
        >
            <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit} className="edit_playlist__form"
                    validateOnBlur>
                {({
                      values,
                      touched,
                      errors,
                      handleSubmit,
                      handleBlur,
                      handleChange,
                      setFieldValue
                  }) =>
                    (<form className="edit_playlist__form" onSubmit={handleSubmit}>
                        <div className="form__cover">
                            {playlist.cover && <img src={playlist.cover}/>}
                            <Input name='cover'
                                   className={`form__input form__input_upload`}
                                   id="cover"
                                   type="file"
                                   onBlur={handleBlur}

                                   onChange={(e) => {
                                       setFieldValue('cover', e.target.files && e.target.files[0])
                                   }}
                            />
                        </div>
                        <Input
                            className="form__name"
                            name="name"
                            placeholder="Добавить название"
                            autoComplete="off"
                            required
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}/>
                        <Input.TextArea
                            className="form__description"
                            name="description"
                            placeholder="Добавить описание (необязательно; не более 300 символов)"
                            maxLength={300}
                            autoComplete="off"
                            value={values.description}
                            onBlur={handleBlur}
                            onChange={handleChange}/>
                        <button type="submit" className="form__save">{"Сохранить".toUpperCase()}</button>
                    </form>)}
            </Formik>
        </Modal>
    );
};

export default EditPlaylistModal;
