<#include "header.ftl">
	
	<#include "menu.ftl">

	<div class="page-header">
		<img src="images/cjug_banner.jpeg"></img>
	</div>
	<div class="row">
		<div class="col-md-8">
			<#list posts as post>
				<#if (post.status == "published")>
					<a href="${post.uri}"><h1><#escape x as x?xml>${post.title}</#escape></h1></a>
					<p>${post.date?string("dd MMMM yyyy")}</p>
					<p>${post.body}</p>
				</#if>
			</#list>
			
			<hr />
		</div>
		<div class="col-md-4">
			<img src="images/cjug_small.jpeg"></img>
			<h2><u>Archives</u></h2>
				<!--<ul>-->
				<#list published_posts as post>
				<#if (last_month)??>
					<#if post.date?string("MMMM yyyy") != last_month>
						</ul>
						<h4>${post.date?string("MMMM yyyy")}</h4>
						<ul>
					</#if>
				<#else>
					<h4>${post.date?string("MMMM yyyy")}</h4>
					<ul>
				</#if>
				
				<li>${post.date?string("dd")} - <a href="${content.rootpath}${post.uri}"><#escape x as x?xml>${post.title}</#escape></a></li>
				<#assign last_month = post.date?string("MMMM yyyy")>
				</#list>
			</ul>
		</div>
	</div>
	
	<p>Older posts are available in the <a href="${content.rootpath}${config.archive_file}">archive</a>.</p>

<#include "footer.ftl">