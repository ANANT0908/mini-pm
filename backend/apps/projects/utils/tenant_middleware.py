from django.shortcuts import get_object_or_404
from apps.projects.models import Organization

class OrganizationMiddleware:
    """Simple middleware that sets request.organization based on X-Org-Slug header or ?org= slug param."""
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        slug = request.headers.get('X-Org-Slug') or request.GET.get('org')
        request.organization = None
        if slug:
            try:
                request.organization = get_object_or_404(Organization, slug=slug)
            except:
                request.organization = None
        return self.get_response(request)
