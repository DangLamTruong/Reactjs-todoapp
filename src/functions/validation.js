export const setValidateRule = (form) => {
    const { title, creator, description} = form;
    return [
        {
            label: 'Title',
            placeholder: 'Type title',
            name: 'title',
            value: title,
            regExPattern: /^.{6,18}$/,
            messageError: 'Please type title, it has length from 6 to 18',
        },
        {
            label: 'Creator',
            placeholder: 'Type of name Creator',
            name: 'creator',
            value: creator,
            regExPattern: /^.{6,12}$/,
            messageError: 'Please type name of Creator, it has length from 6 to 12',
        },
        {
            label: 'Description',
            placeholder: 'Type description detail',
            name: 'description',
            value: description,
            regExPattern: /^.{0,150}$/,
            messageError: 'Please type Description, it has length from 0 to 150',
        },
    ];
};