using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FourthMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("740e660a-3bee-47c9-8117-411dd5e1e89d"));

            migrationBuilder.RenameColumn(
                name: "ContactPerson",
                table: "Leads",
                newName: "LeadName");

            migrationBuilder.AddColumn<Guid>(
                name: "LeadCompanyId",
                table: "Leads",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MyProperty",
                table: "Leads",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "LeadCompanies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LeadCompanyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    ModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ModifiedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeletedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeadCompanies", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("2e44b1a7-5a44-4212-86e5-96336e5bb70a"), null, new DateTimeOffset(new DateTime(2024, 11, 17, 17, 56, 36, 595, DateTimeKind.Unspecified).AddTicks(4630), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "p+glSAUfyYPbkt6izrbzGbx4CI4lJLdPTEKH9q3nxJc=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 11, 17, 12, 41, 36, 595, DateTimeKind.Unspecified).AddTicks(4692), new TimeSpan(0, 0, 0, 0, 0)), "L4VNMLLEFZv1vporsG4ztA==", (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_Leads_LeadCompanyId",
                table: "Leads",
                column: "LeadCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Leads_LeadCompanies_LeadCompanyId",
                table: "Leads",
                column: "LeadCompanyId",
                principalTable: "LeadCompanies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leads_LeadCompanies_LeadCompanyId",
                table: "Leads");

            migrationBuilder.DropTable(
                name: "LeadCompanies");

            migrationBuilder.DropIndex(
                name: "IX_Leads_LeadCompanyId",
                table: "Leads");

            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("2e44b1a7-5a44-4212-86e5-96336e5bb70a"));

            migrationBuilder.DropColumn(
                name: "LeadCompanyId",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "MyProperty",
                table: "Leads");

            migrationBuilder.RenameColumn(
                name: "LeadName",
                table: "Leads",
                newName: "ContactPerson");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("740e660a-3bee-47c9-8117-411dd5e1e89d"), null, new DateTimeOffset(new DateTime(2024, 11, 17, 16, 53, 4, 716, DateTimeKind.Unspecified).AddTicks(4045), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "0HeIzqtZr/AP9dxCb3PJzthciWtNWjkIxzm/uTCU7jc=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 11, 17, 11, 38, 4, 716, DateTimeKind.Unspecified).AddTicks(4139), new TimeSpan(0, 0, 0, 0, 0)), "7AWZdIly1SmjRMgfF8Y/GQ==", (byte)1 });
        }
    }
}
