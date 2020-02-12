const {Builder, By, Key, until} = require('selenium-webdriver');
 
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {

    //Call the Site.
    await driver.get('https://forfun.printercloud.com/admin/index.php');

    //Test if logging in attempt with just the Username fails correctly.
    await driver.findElement(By.id('relogin_user')).sendKeys('pfarnsworth');
    await (await driver.findElement(By.id("logintext"))).getAttribute("text").then(function(fail1txt){
      if (fail1txt = "Please enter your username and password"){console.log("Login with username only failed successfully");} 
      else {console.log("Login with Username only failed unsuccessful");} 
    });

    //A silly work around I discovered to fix the focus problem.
    await driver.get('https://forfun.printercloud.com/admin/index.php');
    await driver.get('https://forfun.printercloud.com/admin/index.php');

    //Test if logging in attempt with Password only fails correctly.
    await driver.findElement(By.id('relogin_password')).sendKeys('Changeme123');
    await (await driver.findElement(By.id("logintext"))).getAttribute("text").then(function(fail2txt){
      if (fail2txt = "Please enter your username and password"){console.log("Login with password only failed successfully ");} 
      else {console.log("Login with password only failed unsuccessful");} 
    });

    await driver.get('https://forfun.printercloud.com/admin/index.php');
    await driver.get('https://forfun.printercloud.com/admin/index.php');

    //Test if logging in attempt with incorrect Username and Password failed correctly. 
    await driver.findElement(By.id('relogin_user')).sendKeys(';klasjdf;lkj');
    await driver.findElement(By.id('relogin_password')).sendKeys('alksjf;lisdj');
    await (await driver.findElement(By.id('admin-login-btn'))).click().then(function(txt){
      if (txt = ""){console.log("Password and username failed login successful ");} 
      else {console.log("Password and username failed login unsuccessful" + txt);} 
    });


    await driver.get('https://forfun.printercloud.com/admin/index.php');
    await driver.get('https://forfun.printercloud.com/admin/index.php');

    //Test if logging in with correct name and password works correctly and sets the user-menu element to the correct text.. 
    await driver.findElement(By.id('relogin_user')).sendKeys('pfarnsworth');
    await driver.findElement(By.id('relogin_password')).sendKeys('Changeme123');
    await (await driver.findElement(By.id('admin-login-btn'))).click();

    await driver.get('https://forfun.printercloud.com/admin/index.php');
    await driver.get('https://forfun.printercloud.com/admin/index.php');

    await (await driver.findElement(By.id("user-menu"))).getAttribute("text").then(function(txt){
      if (txt = "pfarnsworth"){console.log("User-menu text returned correct user name " + txt);} 
      else {console.log("user-menu element did not return the correct name");} });
    await console.log("test completed")  ;
  } 
  catch (e) {
      console.error(e);
  }
  finally {
    await driver.quit();
    
  }
})();

