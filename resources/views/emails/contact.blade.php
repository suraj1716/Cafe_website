<h2>New Contact Message</h2>

<p><strong>Name:</strong> {{ $data['name'] }}</p>
<p><strong>Email:</strong> {{ $data['email'] }}</p>
@if(!empty($data['reason']))
<p><strong>Reason:</strong> {{ $data['reason'] }}</p>
@endif
@if(!empty($data['department']))
<p><strong>Department:</strong> {{ $data['department'] }}</p>
@endif
@if(!empty($data['quantity']))
<p><strong>Quantity:</strong> {{ $data['quantity'] }}</p>
@endif
<p><strong>Message:</strong></p>
<p>{{ $data['message'] }}</p>

@if(!empty($filePath))
<p><em>Attachment included.</em></p>
@endif
