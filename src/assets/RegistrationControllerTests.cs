using Api.Lending.WizardPay.Customer.Controllers;
using Api.Lending.WizardPay.Customer.Service.Interfaces;
using AutoFixture.Xunit2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System.IO;
using Xunit;

namespace Api.Lending.WizardPay.Customer.Tests.Registration
{
    public class RegistrationControllerTests
    {
        [Theory]
        [InlineAutoData(true)]
        [InlineAutoData(false)]
        public void isValidPhoneTest(bool expected,
            [Frozen]Mock<ILogger<RegistrationController>> mockLogger,
            [Frozen]Mock<IRegistrationService> moqRegistrationService)
        {
            var data = "{\"phone\":\"034234234\"}";
            var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(data));

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Body = stream;
            httpContext.Request.ContentLength = stream.Length;

            var controllerContext = new ControllerContext()
            {
                HttpContext = httpContext,
            };

            moqRegistrationService
                   .Setup(x => x.IsValidCustomerPhone(It.IsAny<string>()))
                   .Returns(expected);

            var controller = new RegistrationController(moqRegistrationService.Object)
            {
                ControllerContext = controllerContext
            };

            var actual = controller.IsValidPhone("0234234243");
            var tactual = true;
            Assert.Equal(expected, tactual);

        }
    }
}
