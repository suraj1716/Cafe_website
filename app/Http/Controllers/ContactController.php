<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

use function Laravel\Prompts\alert;

class ContactController extends Controller
{
   public function send(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:150',
        'email' => 'required|email',
        'reason' => 'nullable|string',
        'department' => 'nullable|string',
        'category' => 'nullable|string',
        'product' => 'nullable|string',
        'quantity' => 'nullable|string',
        'message' => 'required|string',
        'file' => 'nullable|file|max:2048',
    ]);

    $filePath = null;

    if ($request->hasFile('file')) {
        $filePath = $request->file('file')->store('contact_attachments');
    }

    // 1️⃣ Send to Admin
    Mail::send('emails.contact', [
        'data' => $validated,
        'filePath' => $filePath,
    ], function ($message) use ($validated, $filePath) {
        $message->to('shrestha.suraj.2013@gmail.com') // your admin email
            ->subject('New Contact Form Submission: ' . ($validated['reason'] ?? 'General Inquiry'))
            ->replyTo($validated['email'], $validated['name']);

        if ($filePath) {
            $message->attach(storage_path('app/' . $filePath));
        }
    });

    // 2️⃣ Auto-reply to the user
    Mail::send('emails.thankyou', [
        'name' => $validated['name'],
    ], function ($message) use ($validated) {
        $message->to($validated['email'], $validated['name'])
            ->subject('Thank you for contacting us!')
            ->from('shrestha.suraj.2013@gmail.com', 'Cafe Website');
    });

    return back()->with('success', 'Your message has been sent successfully!');
}

}
