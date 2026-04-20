document.querySelectorAll('a[rel~="external"]').forEach(function(a) {
	a.target = '_blank';
	if (!a.relList.contains('noopener')) a.relList.add('noopener');
});
