---
title: 'How to install Windows 11 on an unsupported PC'
date: '2021-09-17'
categories: ['tricks-and-tips']
tags: ['windows', 'tricks']
---

You may have heard of Windows 11. It's so exciting but when installing it your PC might be unsupported sometimes. So, in this tutorial, I'll show you how to get a Windows 11 iso file and install it. (Bypass all the requirements :D )

## Contents

## Watch the video

https://youtu.be/3SJRVHbao\_A

## Downloading the iso file and the creator

Ok, let's dive in! First, you have to download an exe file from [this link](https://github.com/euzzeud/GetWindows11Utility/releases/download/1.0.0.0/GetWindows11.exe) and open it. (Don't worry, It's an open-source project that is hosted on [Github](https://github.com/euzzeud/GetWindows11Utility/releases/tag/1.0.0.0))

And the second software to download is [Rufus](https://rufus.ie/en/). Go to the link download it and install it.

### Downloading the iso

You must open the first file that we downloaded. It looks like this when we open it.

![](https://user-images.githubusercontent.com/76736580/133392304-ae710070-f7d6-40b0-860c-99e26b7a1d2c.png)

Now click "Select destination folder" and a popup will open. Then, select the location that you want to save the iso.

After selecting the location, press the "Download" button and wait until it finishes.

## Making a bootable USB

After the download is complete, open Rufus (You installed it right ? [NO](#downloadrufusa)).

The UI should be like this.

![](https://user-images.githubusercontent.com/76736580/133393277-50998de9-f3e4-498f-b057-bb0a95a29540.png)

Now plug in a USB and click the "select" button and choose the downloaded iso file. Now from the Device dropdown menu, select the USB that you want to boot.

The press Start

> Your data on the USB will be deleted when creating the bootable iso so Backup if you want them

Then after the progress end shut down your computer. Boot from the USB and this is what you will get.

![](https://user-images.githubusercontent.com/76736580/133394234-5581383d-f3d3-4bc8-b391-e3af9b94dce4.png)

Now click next.

The from the other screen Click the install button.

![](https://user-images.githubusercontent.com/76736580/133394386-aac03402-a29d-4433-8f07-94edfd4151ad.png)

Then a new window called activate will come. Press I don't have a product key.

![](https://user-images.githubusercontent.com/76736580/133394675-e49ed86c-727c-40f5-b48b-cd37f84a70fa.png)

Now from the other window select anything you want and press next.

![](https://user-images.githubusercontent.com/76736580/133394823-9a7356ff-6105-4fa9-9a31-b05809f5515c.png)

And here's where you will be lucky or unlucky(There's a fix :D). If you are unlucky you can see a screen like this.

![](https://user-images.githubusercontent.com/76736580/133395050-9bcbe96a-f270-41f6-9db4-67b29c77d0db.png)

Now here's the fix for that.

### Steps to remove the error

Press **Shift+F10**

![](https://user-images.githubusercontent.com/76736580/133395379-05f1d4c8-1fe8-42d3-a006-0e141a4681f3.png)

Type **regedit** and press **enter**

Now in the window go to HKEY_LOCAL_MACHINE>SYSTEM>SETUP and right click. Then select add>new key. Type **LabConfig** in there and press **enter**.

Then right click Labconfig and New>Dword (32 bit)value

Then type BypassTPMcheck and press enter. And right click the added item and set value to 1 and press ok.

Do this method for BypassRamcheck , BypassSecureBootcheck also. You will get this after that.

![](https://user-images.githubusercontent.com/76736580/133396912-a625daa7-c632-4a93-b418-3651b92a511b.png)

Now done ! close all the windows and press the Back arrow button (Upper left corner) and click next, We can install !

Then,

![](https://user-images.githubusercontent.com/76736580/133397387-de203cc5-e875-4d62-a81f-c40d9f2fa0df.png)

After that you must select the drive that Windows 11 should be installed. WARNING ! Backup your drive because it will erase all the data !

![](https://user-images.githubusercontent.com/76736580/133397797-e2ef6fe0-b8d9-4fda-9a47-d4847f6cffed.png)

Yay ! you can now install Windows 11.

![](https://www.tronic247.com/wp-content/uploads/2021/09/image-1.png)

Now take a break until Windows finishes installing.

After installing you may see a screen like this.

![](https://user-images.githubusercontent.com/76736580/133398153-2680ef03-d264-451d-8f9f-3342e1102803.png)

now you can change your options and Done !

Thanks for reading please share, and comment if you have a problem :D
