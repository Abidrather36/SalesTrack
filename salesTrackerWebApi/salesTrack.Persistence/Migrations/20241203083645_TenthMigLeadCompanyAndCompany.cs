using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class TenthMigLeadCompanyAndCompany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add CompanyId column to LeadCompanies table
            migrationBuilder.AddColumn<Guid>(
                name: "CompanyId",
                table: "LeadCompanies",
                nullable: false,  // or true if you want to allow null values
                defaultValue: Guid.Empty);  // You can modify the default value if necessary

            // Create foreign key relationship
            migrationBuilder.AddForeignKey(
                name: "FK_LeadCompanies_Companies_CompanyId",
                table: "LeadCompanies",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);  // Optional: specify delete behavior
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove the foreign key relationship
            migrationBuilder.DropForeignKey(
                name: "FK_LeadCompanies_Companies_CompanyId",
                table: "LeadCompanies");

            // Remove the CompanyId column from LeadCompanies table
            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "LeadCompanies");

            // You can revert other changes if necessary
        }
    }
}
