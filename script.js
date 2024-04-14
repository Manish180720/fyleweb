$(document).ready(function () {
    // Initialize Bootstrap tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Submit form event handler
    $("#taxForm").submit(function (event) {
        event.preventDefault();

        // Reset error icons and tooltips
        $(".error-icon").hide();
        $(".form-control").removeClass("is-invalid");

        // Get input values
        const grossIncome = parseFloat($("#name").val());
        const extraIncome = parseFloat($("#extraIncome").val());
        const ageGroup = $("#age").val();
        const deductions = parseFloat($("#deductions").val());

        // Validate input fields
        let validInput = true;
        if (isNaN(grossIncome) || grossIncome < 0) {
            $("#incomeError").show();
            $("#name").addClass("is-invalid");
            validInput = false;
        }
        if (isNaN(extraIncome) || extraIncome < 0) {
            $("#extraIncomeError").show();
            $("#extraIncome").addClass("is-invalid");
            validInput = false;
        }
        if (!ageGroup) {
            $("#ageError").show();
            $("#age").addClass("is-invalid");
            validInput = false;
        }
        if (isNaN(deductions) || deductions < 0) {
            $("#deductionsError").show();
            $("#deductions").addClass("is-invalid");
            validInput = false;
        }

        if (validInput) {
            // Calculate tax based on income and age group
            let taxAmount = 0;
            const overallIncome = grossIncome + extraIncome - deductions;
            if (overallIncome > 800000) {
                const incomeOver8 = overallIncome - 800000;
                switch (ageGroup) {
                    case "<40":
                        taxAmount = incomeOver8 * 0.3;
                        break;
                    case ">=40 & <60":
                        taxAmount = incomeOver8 * 0.4;
                        break;
                    case ">=60":
                        taxAmount = incomeOver8 * 0.1;
                        break;
                }
            }

            const formattedTaxAmount =
                taxAmount >= 100000
                ? (taxAmount / 100000).toFixed(2) + " lakh"
                : taxAmount.toFixed(2) + " ₹";
            $("#taxResult").text(
                `Your calculated tax amount is: ${formattedTaxAmount}`
            );
            $("#taxModal").modal("show");
        }
    });
});
