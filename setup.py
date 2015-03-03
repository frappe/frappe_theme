from setuptools import setup, find_packages
import os

version = '0.0.1'

setup(
    name='frappe_theme',
    version=version,
    description='Theme for Frappe sites',
    author='Frappe',
    author_email='https://frappe.io',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=("frappe",),
)
