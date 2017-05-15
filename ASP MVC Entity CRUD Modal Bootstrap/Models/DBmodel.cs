namespace ASP_MVC_Entity_CRUD_Modal_Bootstrap.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.Data.Entity;

    public class DBmodel : DbContext
    {
        public DBmodel() : base("name=DBmodel")
        {
        }
       
        public virtual DbSet<MyEntity> MyEntities { get; set; }
    }

    public class MyEntity
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string SecondName { get; set; }
        public string PhoneNumber { get; set; }
        [EmailAddress]
        public string Email { get; set; }
    }
}