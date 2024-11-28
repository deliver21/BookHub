using Bogus;
using BookManager.Models;

namespace BookManager.Services
{
    public class BookService:IBookService
    {
        public List<Book> GenerateBooks(Settings settings)
        {
            try
            {
                if (string.IsNullOrEmpty(settings.LanguageRegion))
                {
                    settings.LanguageRegion = "en";
                }
                var random = new Random(settings.Seed.GetHashCode() + settings.PageNumber);
                var fakerLanguage = new Faker(settings.LanguageRegion);
                var books = new List<Book>();

                int startIndex = (settings.PageNumber - 1) * 10 + 1;

                for (int i = 0; i < 10; i++)
                {
                    var book = PopulateBook(i, startIndex, fakerLanguage, settings);
                    books.Add(book);
                }

                return books;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"From Book Service : {ex.Message}");
            }            
            return new List<Book>();
        }
        private Book PopulateBook(int i ,int startIndex, Faker faker, Settings settings)
        {
            return new Book
            {
                Index = startIndex + i,
                ISBN = faker.Commerce.Ean13(),
                Title = faker.Lorem.Sentence(),
                Author = faker.Name.FullName(),
                Publisher = faker.Company.CompanyName(),
                AvgLikes = settings.AvgLikes,
                AvgReviews = settings.AvgReviews,
                ImageUrl = faker.Image.LoremFlickrUrl(),
                Reviews = GenerateReviews(faker, (int)settings.AvgReviews),
            };
        }
        private string[] GenerateReviews(Faker f, int reviewCount)
        {
            var reviews = new string[reviewCount];
            for (int i = 0; i < reviews.Length; i++)
            {
                reviews[i] = f.Lorem.Sentence();
            }
            return reviews;
        }
    }
}
