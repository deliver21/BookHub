﻿using BookManager.Models;

namespace BookManager.Services
{
    public interface IBookService
    {
        List<Book> GenerateBooks(Settings settings);
    }
}