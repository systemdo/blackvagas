import Service from './Service';

class CompanyService {
    sendCompany(company) {
        return Service.post('/company', company);
    } 
}

export default CompanyService;