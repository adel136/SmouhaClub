using Microsoft.EntityFrameworkCore;
using Smouhaclub.Models;
using System.ComponentModel.DataAnnotations;

namespace Smouhaclub.Areas.CPanel.ViewsModel
{
    public class newsModel : TblNews
    {
        public IEnumerable<TblNewsGallery> Gallery { get; set; }
    }
}
