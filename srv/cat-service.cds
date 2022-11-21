using my.bookshop as my from '../db/data-model';


service CatalogService @(requires : 'authenticated-user') {
    @readonly
    entity Books       as projection on my.Books;

    action submitOrder(book : Books:ID, quantity : Integer) returns {
        stock : Integer
    };

    /**
     * For displaying lists of Books
     */
    @readonly
    entity ListOfBooks as projection on Books excluding {
        descr
    };

}
