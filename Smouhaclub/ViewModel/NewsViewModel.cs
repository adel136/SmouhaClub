using Smouhaclub.Models;

namespace Smouhaclub.ViewModel
{
    public class NewsViewModel:TblNews
    {
        public IEnumerable<TblNewsGallery> Gallery { get; set; }
    }
}
