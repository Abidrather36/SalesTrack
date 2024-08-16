using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EnquiriesNameUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Enquires",
                table: "Enquires");

            migrationBuilder.RenameTable(
                name: "Enquires",
                newName: "Enquiries");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enquiries",
                table: "Enquiries",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Enquiries",
                table: "Enquiries");

            migrationBuilder.RenameTable(
                name: "Enquiries",
                newName: "Enquires");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enquires",
                table: "Enquires",
                column: "Id");
        }
    }
}
