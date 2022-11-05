<h2>Schema </h2>

<h3><b>User</b></h3>
<div>email: string</div>
<div>password: string</div>
<div>_id: string</div>
<div>surveys: [Survey]</div>
<br/>
<br/>
<h3><b>Survey</b></h3>
<div>_id: string</div>
<div>title: string</div>
<div>questions: [Question]</div>
<br/>
<br/>
<h3><b>Question</b></h3>
<div>_id: string</div>
<div>title: string</div>
<div>options: [Option]</div>
<br/>
<br/>
<h3><b>Option</b></h3>
<div>_id: string</div>
<div>name: string</div>
<div>count: number</div>
