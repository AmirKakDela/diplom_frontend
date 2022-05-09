import * as yup from "yup";

const SUPPORTED_FORMATS_IMAGE = ["image/jpg", "image/jpeg", "image/png"];
const SUPPORTED_FORMATS_AUDIO = ["audio/mpeg", "audio/wav"];

export let validationRulesSong = {
    name: yup.string().trim()
        .required('Введите название песни.'),
    artistId: yup.string().trim()
        .required('Введите имя исполнителя.'),
    cover: yup
        .mixed()
        .required("Загрузите обложку для песни.")
        .test("fileFormat", "Неподдерживаемый формат файла. Загрузите файл типа image.", value => value && SUPPORTED_FORMATS_IMAGE.includes(value.type)),
    song: yup
        .mixed()
        .required("Загрузите аудиофайл песни.")
        .test("fileFormat", "Неподдерживаемый формат файла. Загрузите файл типа audio.", value => value && SUPPORTED_FORMATS_AUDIO.includes(value.type)),
    genre: yup.string().trim()
        .required('Выберите соотвествующий жанр для песни.')
}

export let validationRulesAlbum = {
    name: yup.string().trim()
        .required('Введите название альбома.'),
    artist: yup.string().trim()
        .required('Введите имя исполнителя.'),
    song: yup.string().trim()
        .required("Выберите песни."),
        // .test("fileFormat", "Неподдерживаемый формат файла. Загрузите файл типа audio.",
        //     value => value && SUPPORTED_FORMATS_AUDIO.includes(value.type)),
    cover: yup
        .mixed()
        .required("Загрузите обложку для альбома.")
        .test("fileFormat", "Неподдерживаемый формат файла. Загрузите файл типа image.",
                value => value && SUPPORTED_FORMATS_IMAGE.includes(value.type))
}

export let validationRulesArtist = {
    name: yup.string().trim()
        .required('Введите имя исполнителя.'),
    image: yup
        .mixed()
        .required("Загрузите фото исполнителя.")
        .test("fileFormat", "Неподдерживаемый формат файла. Загрузите файл типа image.",
                value => value && SUPPORTED_FORMATS_IMAGE.includes(value.type)),
}
