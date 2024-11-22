using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SixthMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Adding LeadCompanyId column to FollowUpDates table
            migrationBuilder.AddColumn<Guid>(
                name: "LeadCompanyId",
                table: "FollowUpDates",
                type: "uniqueidentifier",
                nullable: true); // Make LeadCompanyId nullable to allow for optional relationships

            // Create Index for LeadCompanyId to optimize queries on that column
            migrationBuilder.CreateIndex(
                name: "IX_FollowUpDates_LeadCompanyId",
                table: "FollowUpDates",
                column: "LeadCompanyId");

            // Add Foreign Key constraint between FollowUpDates and LeadCompanies
            migrationBuilder.AddForeignKey(
                name: "FK_FollowUpDates_LeadCompanies_LeadCompanyId",
                table: "FollowUpDates",
                column: "LeadCompanyId",
                principalTable: "LeadCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull); // Set the foreign key action to set the column to NULL when LeadCompany is deleted

            // Insert test data into MasterUsers table
            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] {
                    new Guid("470f9186-1b27-4ef3-9e1e-a6975a595080"),
                    null,
                    new DateTimeOffset(new DateTime(2024, 11, 19, 12, 17, 47, 745, DateTimeKind.Unspecified).AddTicks(9511), new TimeSpan(0, 5, 30, 0, 0)),
                    null,
                    null,
                    "ramrk@anterntech.com",
                    false,
                    true,
                    null,
                    null,
                    "Ram",
                    "mKW+LWgezte/lXEatPUaQ7m9Y5R9LAAruS2EyhcMyBQ=",
                    "6545454543",
                    12345,
                    new DateTimeOffset(new DateTime(2024, 11, 19, 7, 2, 47, 745, DateTimeKind.Unspecified).AddTicks(9582), new TimeSpan(0, 0, 0, 0, 0)),
                    "URC+p/yrEUstUXL0E9WznQ==",
                    (byte)1
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove the foreign key constraint
            migrationBuilder.DropForeignKey(
                name: "FK_FollowUpDates_LeadCompanies_LeadCompanyId",
                table: "FollowUpDates");

            // Drop the index created for LeadCompanyId column
            migrationBuilder.DropIndex(
                name: "IX_FollowUpDates_LeadCompanyId",
                table: "FollowUpDates");

            // Delete the inserted test data
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("470f9186-1b27-4ef3-9e1e-a6975a595080"));

            // Drop the LeadCompanyId column from FollowUpDates table
            migrationBuilder.DropColumn(
                name: "LeadCompanyId",
                table: "FollowUpDates");

            // Insert back the previous test data into MasterUsers table
            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] {
                    new Guid("7c1bc0b5-780e-40c1-9a6d-56de225e21b9"),
                    null,
                    new DateTimeOffset(new DateTime(2024, 11, 18, 12, 37, 28, 376, DateTimeKind.Unspecified).AddTicks(1660), new TimeSpan(0, 5, 30, 0, 0)),
                    null,
                    null,
                    "ramrk@anterntech.com",
                    false,
                    true,
                    null,
                    null,
                    "Ram",
                    "f/7IFCmM4PdudHJAJ1O4zmiVYzqiVD7W4kJpOimvG5E=",
                    "6545454543",
                    12345,
                    new DateTimeOffset(new DateTime(2024, 11, 18, 7, 22, 28, 376, DateTimeKind.Unspecified).AddTicks(1723), new TimeSpan(0, 0, 0, 0, 0)),
                    "oStdkdZKVM3TfAWLmocY1g==",
                    (byte)1
                });
        }
    }
}
