using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

[Table("tbl_Members")]
public partial class TblMember
{
    [Key]
    public int MemberId { get; set; }

    [StringLength(50)]
    public string? FirstName { get; set; }

    [StringLength(50)]
    public string? LastName { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? MemberCode { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? PhoneNumber { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? MemberEmail { get; set; }

    [StringLength(100)]
    public string? MemberAddress { get; set; }

    public DateOnly? DateBirth { get; set; }

    public DateOnly? JoinDate { get; set; }

    public DateOnly? RenewalDate { get; set; }

    [Column(TypeName = "decimal(18, 0)")]
    public decimal? MembershipCost { get; set; }
}
