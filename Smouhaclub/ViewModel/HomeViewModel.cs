using Smouhaclub.Models;

namespace Smouhaclub.ViewModel
{
    public class HomeViewModel
    {
        public IEnumerable<TblNews> tblNews {  get; set; } 
        public IEnumerable<TblService> tblService { get; set; }

    }
}
