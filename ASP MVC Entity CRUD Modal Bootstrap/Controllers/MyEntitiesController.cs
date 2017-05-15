using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using ASP_MVC_Entity_CRUD_Modal_Bootstrap.Models;

namespace ASP_MVC_Entity_CRUD_Modal_Bootstrap.Controllers
{
    public class MyEntitiesController : Controller
    {
        private DBmodel db = new DBmodel();

        // GET: MyEntities/Index
        public ActionResult Index()
        {
            return View(db.MyEntities.ToList());
        }

        // GET: MyEntities/Create
        public ActionResult Create()
        {
            return PartialView();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,FirstName,SecondName,PhoneNumber,Email")] MyEntity myEntity)
        {
            if (ModelState.IsValid)
            {
                db.MyEntities.Add(myEntity);
                db.SaveChanges();
                return Json(myEntity);
            }
            return Json("Create error");
        }

        //GET: MyEntities/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MyEntity myEntity = db.MyEntities.Find(id);
            if (myEntity == null)
            {
                return HttpNotFound();
            }
            return PartialView(myEntity);
        }

        //POST: MyEntities/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,FirstName,SecondName,PhoneNumber,Email")] MyEntity myEntity)
        {
            if (ModelState.IsValid)
            {
                db.Entry(myEntity).State = EntityState.Modified;
                db.SaveChanges();
                return Json(myEntity);
            }
            return Json("Edit error");
        }

        //GET: MyEntities/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MyEntity myEntity = db.MyEntities.Find(id);
            if (myEntity == null)
            {
                return HttpNotFound();
            }
            return PartialView(myEntity);
        }

        //POST: MyEntities/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            MyEntity myEntity = db.MyEntities.Find(id);
            db.MyEntities.Remove(myEntity);
            return Json(db.SaveChanges());
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
