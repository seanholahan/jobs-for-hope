import globals
from globals import clean_location, city_to_zip, get_soup, get_javascript_soup_delayed, update_db

organization = 'Los Angeles Homeless Services Authority'
url = 'https://www.governmentjobs.com/careers/lahsa'


def run(url):
    next_page_url = url
    soup = get_javascript_soup_delayed(next_page_url, 'job-table-title')

    while soup:
        job_table = soup.find('tbody')
        for job_row in job_table.find_all('tr'):
            globals.job_title = job_row.find(
                'td', {'class': 'job-table-title'}).a.text.strip()
            globals.info_link = 'https://www.governmentjobs.com' + \
                job_row.find('td', {'class': 'job-table-title'}).a['href']
            globals.salary = job_row.find(
                'td', {'class': 'job-table-salary'}).text
            globals.full_or_part = job_row.find(
                'td', {'class': 'job-table-type'}).text
            # Get soup for job listing to get more info
            job_soup = get_soup(globals.info_link)
            info_container = job_soup.find(
                'div', {'class': 'summary container'})
            globals.job_location = clean_location(info_container.find(
                'div', {'id': 'location-label-id'}).parent.find_all('div')[2].text)
            globals.job_zip_code = city_to_zip(globals.job_location)
            globals.job_summary = job_soup.find(
                'div', {'id': 'details-info'}).find('p').text
            update_db(organization)
        if not 'disabled' in soup.find(
                'li', {'class': 'PagedList-skipToNext'}).get("class"):
            next_page_url = 'https://www.governmentjobs.com/careers/lahsa?' + \
                soup.find('li', {'class': 'PagedList-skipToNext'}
                          ).a['href'].split('?')[1]
            soup = get_javascript_soup_delayed(
                next_page_url, 'job-table-title')
        else:
            soup = False
