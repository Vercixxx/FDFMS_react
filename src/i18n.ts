
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
                    'items will be deleted': 'items will be deleted',
                    'Are you sure?': 'Are you sure?',
                    'Are you sure delete these items?': 'Are you sure delete these items?',
                    'Are you sure delete this item?': 'Are you sure delete this item?',
                    'Error': 'Error',
                    'Opration isn\'t allowed': 'Opration isn\'t allowed',
                    'Field is obliatory': 'Field is obliatory',
                    Settings: 'Settings',
                    'Table settings': 'Table settings',
                    'Save': 'Save',
                    'Update': 'Update',
                    'Cancel': 'Cancel',

                    // Logout
                    'Are you sure you want to logout?': 'Are you sure you want to logout?',

                    Name: 'Name',
                    Names: 'Names',
                    Country: 'Country',
                    Countries: 'Countries',
                    Manage: 'Manage',
                    State: 'State',
                    States: 'States',




                    // Menu / BreadCrumb
                    Home: 'Home',
                    Users: 'Users',
                    Other: 'Other',
                    Mailbox: 'Mailbox',

                    // HRMenu
                    'Add User': 'Add User',
                    'Edit User': 'Edit User',
                    HR: 'HR',
                    Payroll: 'Payroll',
                    Asset: 'Asset',
                    Client: 'Client',
                    Manager: 'Manager',
                    Driver: 'Driver',
                    'Manage Users': 'Manage Users',
                    'Manage Countries': 'Manage Countries',
                    'Manage countries': 'Manage countries',
                    'Manage States': 'Manage States',
                    'Manage states': 'Manage states',
                    'Add State': 'Add State',
                    'Add Country': 'Add Country',

                    'Edit State': 'Edit State',
                    'Edit Country': 'Edit Country',

                    'State added successfully': 'State added successfully',
                    'Country added successfully': 'Country added successfully',


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
                    'Items per page': 'Items per page',
                    'Page size': 'Page size',
                    'Export type': 'Export type',
                    'Export row to Excel': 'Export row to Excel',
                    'Export row to PDF': 'Export row to PDF',
                    'All pages': 'All pages',
                    'Current page': 'Current page',
                    'Selected rows': 'Selected rows',
                    'Please select at least one row': 'Please select at least one row',
                    'Copy row': 'Copy row',
                    'Copy selected': 'Copy selected',
                    'Role': 'Role',
                    'Status': 'Status',
                    'Date joined': 'Date joined',
                    'Email': 'Email',
                    'User role': 'User role',
                    'User status': 'User status',
                    'Phone': 'Phone',
                    'First name': 'First name',
                    'Last name': 'Last name',
                    'Page': 'Page',
                    'of': 'of',
                    'Display mode': 'Display mode',
                    'Detailed': 'Detailed',
                    'Manipulation': 'Manipulation',
                    'Key': 'Key',
                    'Value': 'Value',
                    'Edit row': 'Edit row',
                    'Delete row': 'Delete row',
                    'Delete selected': 'Delete selected',
                    'Copied successfully': 'Copied successfully',
                    'Exported successfully': 'Exported successfully',
                    'Export with details': 'Export with details',
                    'Export options': 'Export options',
                    'Export': 'Export',
                    'Select columns': 'Select columns',
                    'No records found': 'No records found',
                    'Field is required': 'Field is required',
                    'Field is too long': 'Field is too long',
                    'Field format is invalid': 'Field format is invalid',
                    'Tax Office Name': 'Tax Office Name',
                    'Tax Office Address': 'Tax Office Address',
                    'PESEL': 'PESEL',
                    'NFZ Office Name': 'NFZ Office Name',
                    'Bank Account Number': 'Bank Account Number',
                    'First Name': 'First Name',
                    'Last Name': 'Last Name',
                    'Basic Information': 'Basic Information',
                    'Tax Information': 'Tax Information',
                    'Residence Address': 'Residence Address',
                    'Residence City': 'Residence City',
                    'Residence Postal Code': 'Residence Postal Code',
                    'Residence Street': 'Residence Street',
                    'Residence House Number': 'Residence House Number',
                    'Residence Apartment Number': 'Residence Apartment Number',
                    'Select country': 'Select country',
                    'Select state': 'Select state',
                    'Select country first': 'Select country first',
                    'There are no states for the selected country': 'There are no states for the selected country',
                    'Username will be generated automatically': 'Username will be generated automatically',
                    'Correspondence Address': 'Correspondence Address',
                    'Correspondence City': 'Correspondence City',
                    'Correspondence Postal Code': 'Correspondence Postal Code',
                    'Correspondence Street': 'Correspondence Street',
                    'Correspondence House Number': 'Correspondence House Number',
                    'Correspondence Apartment Number': 'Correspondence Apartment Number',
                    'Same as residence': 'Same as residence',
                    'Registered Address': 'Registered Address',
                    'Registered City': 'Registered City',
                    'Registered Postal Code': 'Registered Postal Code',
                    'Registered Street': 'Registered Street',
                    'Registered House Number': 'Registered House Number',
                    'Registered Apartment Number': 'Registered Apartment Number',
                    'User class': 'User class',
                    'Profile': 'Profile',
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
                    ' will be deleted': 'zostaną usunięte',
                    'items will be deleted': 'elementy/ów zostaną/nie usunięte',
                    'Are you sure?': 'Czy na pewno?',
                    'Are you sure delete these items?': 'Czy na pewno usunąć te elementy?',
                    'Are you sure delete this item?': 'Czy na pewno usunąć ten element?',
                    'Error': 'Błąd',
                    'Opration isn\'t allowed': 'Operacja niedozwolona',
                    'Field is obliatory': 'Pole jest obowiązkowe',
                    Settings: 'Ustawienia',
                    'Table settings': 'Ustawienia tabeli',
                    'Save': 'Zapisz',
                    'Update': 'Aktualizuj',
                    'Cancel': 'Anuluj',

                    // Logout
                    'Are you sure you want to logout?': 'Czy napewno chcesz sie wylogowac?',

                    Name: 'Nazwa',
                    Names: 'Nazwy',
                    Country: 'Kraj',
                    Countries: 'Kraje',
                    Manage: 'Zarządzaj' ,
                    States: 'Województwa',
                    State: 'Województwo',
                    'Manage States': 'Zarządzaj województwami',


                    // Menu / BreadCrumb
                    Home: 'Strona główna',
                    Users: 'Użytkownicy',
                    Other: 'Inne',
                    Mailbox: 'Skrzynka odbiorcza',

                    // HRMenu
                    'Add User': 'Dodaj użytkownika',
                    'Edit User': 'Edytuj użytkownika',
                    HR: 'Zasoby ludzkie',
                    Payroll: 'Finanse',
                    Asset: 'Mienie',
                    Client: 'Klient',
                    Manager: 'Menedżer',
                    Driver: 'Kierowca',
                    'Manage Users': 'Zarządzaj użytkownikami',
                    'Manage Countries': 'Zarządzaj krajami',
                    'Manage countries': 'Zarządzaj krajami',
                    'Manage states': 'Zarządzaj województwami',
                    'Add State': 'Dodaj województwo',
                    'Edit State': 'Edytuj województwo',
                    'Add Country': 'Dodaj kraj',
                    'Edit Country': 'Edytuj kraj',



                    // GridComponent
                    Add: 'Dodaj',
                    Edit: 'Edytuj',
                    Copy: 'Kopiuj',
                    Delete: 'Usuń',
                    Item: 'Element',
                    Items: 'Elementy/ów',
                    'Export to Excel': 'Eksportuj do Excel',
                    'Export to PDF': 'Eksportuj do PDF',
                    'Error while fetching data, please try again': 'Błąd podczas pobierania danych, spróbuj ponownie',
                    'Successfully added': 'Pomyślnie dodano',
                    'Error while adding, please try again': 'Błąd podczas dodawania, spróbuj ponownie',
                    'Successfully edited': 'Pomyślnie edytowano',
                    'Error while editing, please try again': 'Błąd podczas edycji, spróbuj ponownie',
                    'Successfully deleted': 'Pomyślnie usunięto',
                    'Error while deleting, please try again': 'Błąd podczas usuwania, spróbuj ponownie',
                    'Items per page': 'Elementy na stronę',
                    'Page size': 'Rozmiar strony',
                    'Export type': 'Typ eksportu',
                    'Export row to Excel': 'Eksportuj wiersz do Excel',
                    'Export row to PDF': 'Eksportuj wiersz do PDF',
                    'All pages': 'Wszystkie strony',
                    'Current page': 'Obecna strona',
                    'Selected rows': 'Wybrane rekordy',
                    'Please select at least one row': 'Proszę wybrać przynajmniej jeden wiersz',
                    'Copy row': 'Kopiuj wiersz',
                    'Copy selected': 'Kopiuj zaznaczone',
                    'Role': 'Rola',
                    'Status': 'Status',
                    'Date joined': 'Konto od',
                    'Phone': 'Number telefonu',
                    'First name': 'Imię',
                    'Last name': 'Nazwisko',
                    'Email': 'Email',
                    'User role': 'Typ użytkownika',
                    'User status': 'Status użytkownika',
                    'Page': 'Strona',
                    'of': 'z',
                    'Display mode': 'Tryb wyświetlania',
                    'Detailed': 'Szczegółowy',
                    'Manipulation': 'Manipulacja danych',
                    'Key': 'Nazwa',
                    'Value': 'Wartość',
                    'Edit row': 'Edytuj wiersz',
                    'Delete row': 'Usuń wiersz',
                    'Delete selected': 'Usuń zaznaczone',
                    'Copied successfully': 'Skopiowano',
                    'Exported successfully': 'Eksportowano pomyślnie',
                    'Export with details': 'Eksportuj szczegółowo',
                    'Export options': 'Opcje eksportu',
                    'Export': 'Eksportuj',
                    'Select columns': 'Wybierz kolumny',
                    'No records found': 'Brak danych',
                    'Field is required': 'Pole jest wymagane',
                    'Field is too long': 'Pole jest za długie',
                    'Field format is invalid': 'Nieprawidłowy format',
                    'Tax Office Name': 'Nazwa Urzędu Skarbowego',
                    'Tax Office Address': 'Adres Urzędu Skarbowego',
                    'PESEL': 'PESEL',
                    'NFZ Office Name': 'Nazwa NFZ',
                    'Bank Account Number': 'Numer konta bankowego',
                    'First Name': 'Imię',
                    'Last Name': 'Nazwisko',
                    'Basic Information': 'Informacje podstawowe',
                    'Tax and Health': 'Informacje podatkowe i zdrowotne',
                    'Residence Address': 'Adres zamieszkania',
                    'Residence City': 'Miasto zamieszkania',
                    'Residence Postal Code': 'Kod pocztowy',
                    'Residence Street': 'Ulica',
                    'Residence House Number': 'Numer domu',
                    'Residence Apartment Number': 'Numer mieszkania',
                    'Select country': 'Wybierz kraj',
                    'Select state': 'Wybierz województwo',
                    'Select country first': 'Najpierw wybierz kraj',
                    'There are no states for the selected country': 'Brak województw dla wybranego kraju',
                    'Username will be generated automatically': 'Nazwa użytkownika zostanie wygenerowana automatycznie',
                    'Correspondence Address': 'Adres korespondencyjny',
                    'Correspondence City': 'Miasto korespondencyjne',
                    'Correspondence Postal Code': 'Kod pocztowy korespondencyjny',
                    'Correspondence Street': 'Ulica korespondencyjna',
                    'Correspondence House Number': 'Numer domu korespondencyjny',
                    'Correspondence Apartment Number': 'Numer mieszkania korespondencyjny',
                    'Same as residence': 'Taki sam jak zamieszkania',
                    'Registered Address': 'Adres zameldowania',
                    'Registered City': 'Miasto zameldowania',
                    'Registered Postal Code': 'Kod pocztowy zameldowania',
                    'Registered Street': 'Ulica zameldowania',
                    'Registered House Number': 'Numer domu zameldowania',
                    'Registered Apartment Number': 'Numer mieszkania zameldowania',
                    'User class': 'Klasa użytkownika',
                    'Profile': 'Profil',


                },
            },
        },

        interpolation: {
            escapeValue: false,
        }
    });


export default i18n;