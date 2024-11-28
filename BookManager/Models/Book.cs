namespace BookManager.Models
{
    public class Book
    {
        public int Index { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public double AvgLikes { get; set; }
        public double AvgReviews { get; set; }
        public string ImageUrl { get; set; }
        public string[] Reviews { get; set; }
    }
}
