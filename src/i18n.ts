
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import { Add } from '@mui/icons-material';


i18n

    .use(LanguageDetector)

    .use(initReactI18next)

    .init({
        debug: true,


        resources: {
            EN: {
                translation: {
                    Name: 'Name',
                    Country: 'Country',
                    Manage: 'Manage',
                    States: 'States',
                    'Manage States': 'Manage States',


                    // Menu / BreadCrumb
                    Home: 'Home',
                    Users: 'Users',
                    Other: 'Other',
                    Mailbox: 'Mailbox',

                    // HRMenu
                    'Add User': 'Add User',
                    HR: 'HR',
                    Payroll: 'Payroll',
                    Asset: 'Asset',
                    Client: 'Client',
                    Manager: 'Manager',
                    Driver: 'Driver',
                    'Manage Users': 'Manage Users',
                    'Manage countries': 'Manage countries',
                    'Manage states': 'Manage states',


                    // GridComponent
                    Add: 'Add',
                    Edit: 'Edit',
                    Copy: 'Copy',
                    Delete: 'Delete',
                    'Export to Excel': 'Export to Excel',
                    'Export to PDF': 'Export to PDF',
                    'Successfully added': 'Successfully added',
                    'Error while adding, please try again': 'Error while adding, please try again',
                    'Successfully edited': 'Successfully edited',
                    'Error while editing, please try again': 'Error while editing, please try again',
                    'Successfully deleted': 'Successfully deleted',
                    'Error while deleting, please try again': 'Error while deleting, please try again',
                },
            },
            PL: {
                translation: {
                    Name: 'Nazwa',
                    Country: 'Kraj',
                    Manage: 'Zarządzaj',
                    States: 'Województwami',
                    'Manage States': 'Zarządzaj województwami',


                    // Menu / BreadCrumb
                    Home: 'Strona główna',
                    Users: 'Użytkownicy',
                    Other: 'Inne',
                    Mailbox: 'Skrzynka odbiorcza',

                    // HRMenu
                    'Add User': 'Dodaj użytkownika',
                    HR: 'Zasoby ludzkie',
                    Payroll: 'Finanse',
                    Asset: 'Mienie',
                    Client: 'Klient',
                    Manager: 'Menedżer',
                    Driver: 'Kierowca',
                    'Manage Users': 'Zarządzaj użytkownikami',
                    'Manage countries': 'Zarządzaj krajami',
                    'Manage states': 'Zarządzaj województwami',
                    


                    // GridComponent
                    Add: 'Dodaj',
                    Edit: 'Edytuj',
                    Copy: 'Kopiuj',
                    Delete: 'Usuń',
                    'Export to Excel': 'Eksport do Excel',
                    'Export to PDF': 'Eksport do PDF',
                    'Successfully added': 'Pomyślnie dodano',
                    'Error while adding, please try again': 'Błąd podczas dodawania, spróbuj ponownie',
                    'Successfully edited': 'Pomyślnie edytowano',
                    'Error while editing, please try again': 'Błąd podczas edycji, spróbuj ponownie',
                    'Successfully deleted': 'Pomyślnie usunięto',
                    'Error while deleting, please try again': 'Błąd podczas usuwania, spróbuj ponownie',

                },
            },
        },

        interpolation: {
            escapeValue: false,
        }
    });


export default i18n;