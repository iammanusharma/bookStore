using Api.Lending.WizardPay.Customer.Repository.Interfaces;
using Api.Lending.WizardPay.Customer.Service;
using Api.Lending.WizardPay.Customer.Service.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Api.Lending.WizardPay.Customer.Tests.ServiceTests
{
    public class RegistrationServiceTests
    {
        protected Mock<ILoansRepository> loansRepositoryMock;
        protected IRegistrationService registrationService;
        public RegistrationServiceTests()
        {
            loansRepositoryMock = new Mock<ILoansRepository>();
            loansRepositoryMock.Setup(l => l.IsValidCustomerEmail(It.IsAny<string>())).Returns(true);
            registrationService = new RegistrationService(loansRepositoryMock.Object);
        }
    }
    
    public class RegistrationService_IsValidCustomerEmail_Tests: RegistrationServiceTests
    {
        [Fact]
        public void Calls_LoansRepository_IsValidCustomerEmail()
        {
            //Arrange
            string testEmail = "test@testemail.com";

            //Act
            registrationService.IsValidCustomerEmail(testEmail);

            //Assert
            loansRepositoryMock.Verify(l => l.IsValidCustomerEmail(testEmail), Times.Once());
        }

        [Fact]
        public void Verify_Result()
        {
            //Arrange
            string testEmail = "test@testemail.com";
            var expectedResult = true;

            //Act
            var actualResult = registrationService.IsValidCustomerEmail(testEmail);

            //Assert
            Assert.Equal(expectedResult, actualResult);
        }
    }
}
