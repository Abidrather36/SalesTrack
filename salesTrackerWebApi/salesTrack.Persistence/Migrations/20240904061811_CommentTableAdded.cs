using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CommentTableAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Leads_LeadId",
                table: "Comments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Comments",
                table: "Comments");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("8d09171c-9cd4-4766-8d4d-04f77e9856e1"));

            migrationBuilder.RenameTable(
                name: "Comments",
                newName: "LeadComments");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_LeadId",
                table: "LeadComments",
                newName: "IX_LeadComments_LeadId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LeadComments",
                table: "LeadComments",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("54440006-062c-4c5c-8da3-b7126f98a704"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "wMVMBCWBAnEwpWWvXSjDSfXCiUxC5+wog2tGdnTi/8M=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 9, 4, 6, 33, 8, 850, DateTimeKind.Unspecified).AddTicks(1123), new TimeSpan(0, 0, 0, 0, 0)), "WEBu8fAg5rk+GSqdZaPHOQ==", (byte)1, (byte)0 });

            migrationBuilder.AddForeignKey(
                name: "FK_LeadComments_Leads_LeadId",
                table: "LeadComments",
                column: "LeadId",
                principalTable: "Leads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeadComments_Leads_LeadId",
                table: "LeadComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LeadComments",
                table: "LeadComments");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("54440006-062c-4c5c-8da3-b7126f98a704"));

            migrationBuilder.RenameTable(
                name: "LeadComments",
                newName: "Comments");

            migrationBuilder.RenameIndex(
                name: "IX_LeadComments_LeadId",
                table: "Comments",
                newName: "IX_Comments_LeadId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comments",
                table: "Comments",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("8d09171c-9cd4-4766-8d4d-04f77e9856e1"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "g8cU2sReTyVSg+qxAmf3rflWyhJBk8c23bVlngvl8kg=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 9, 3, 7, 12, 16, 79, DateTimeKind.Unspecified).AddTicks(3206), new TimeSpan(0, 0, 0, 0, 0)), "aNvr18p5KsUIMZR77JO/pg==", (byte)1, (byte)0 });

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Leads_LeadId",
                table: "Comments",
                column: "LeadId",
                principalTable: "Leads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
