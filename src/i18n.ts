
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
                    // General
                    Yes: 'Yes',
                    No: 'No',
                    Username: 'Username',
                    Password: 'Password',
                    'Sign in': 'Sign in',
                    'Invalid credentials': 'Invalid credentials',
                    'will be deleted': 'will be deleted',
                    'Are you sure?': 'Are you sure?',
                    'Are you sure delete this item?': 'Are you sure delete this item?',
                    'Error': 'Error',
                    'Opration isn\'t allowed': 'Opration isn\'t allowed',

                    // Logout
                    'Are you sure you want to logout?': 'Are you sure you want to logout?',

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
                    Item: 'Item',
                    Items: 'Items',
                    'Export to Excel': 'Export to Excel',
                    'Export to PDF': 'Export to PDF',
                    'Error while fetching data, please try again': 'Error while fetching data, please try again',
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
                    // General
                    Yes: 'Tak',
                    No: 'Nie',
                    Username: 'Nazwa użytkownika',
                    Password: 'Hasło',
                    'Sign in': 'Zaloguj',
                    'Invalid credentials': 'Nieprawidłowe dane',
                    'will be deleted': 'zostanie usunięty',
                    'Are you sure?': 'Czy na pewno?',
                    'Are you sure delete this item?': 'Czy na pewno usunąć ten element?',
                    'Error': 'Błąd',
                    'Opration isn\'t allowed': 'Operacja niedozwolona',

                    // Logout
                    'Are you sure you want to logout?': 'Czy napewno chcesz sie wylogowac?',

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
                    Item: 'Element',
                    Items: 'Elementy/ów',
                    'Export to Excel': 'Eksport do Excel',
                    'Export to PDF': 'Eksport do PDF',
                    'Error while fetching data, please try again': 'Błąd podczas pobierania danych, spróbuj ponownie',
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