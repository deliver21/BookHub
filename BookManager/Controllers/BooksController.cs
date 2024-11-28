using BookManager.Models;
using BookManager.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace BookManager.Controllers
{
    [Route("Books")]
    public class BooksController : Controller
    {
        private readonly IBookService _bookService;
        public BooksController(IBookService bookService) 
        {
            _bookService = bookService;
        }
        public IActionResult Index()
        {
            return View();
        }
        #region APIs Call
        [HttpPost("Generate")]
        public IActionResult GetBooks([FromBody] Settings? settings)
        {
            if (settings == null)
            {
                return BadRequest(new { message = "Invalid settings" });
            }
            var books = _bookService.GenerateBooks(settings);
            return Ok(books);
        }

        [HttpPost("Export")]
        public IActionResult ExportToCvs([FromBody] List<Book> books)
        {
            var cvs = new StringBuilder();
            cvs.AppendLine("Index,ISBN,Title,Author,Publisher");

            foreach (var book in books)
            {
                cvs.AppendLine($"{book.Index},{book.ISBN},{book.Title},{book.Author},{book.Publisher}");
            }
            return File(Encoding.UTF8.GetBytes(cvs.ToString()), "text/cvs", "books.cvs");
        }
        #endregion
    }
}
