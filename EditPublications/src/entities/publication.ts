import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';

export class Publication{
    public constructor(
        public meno: string = '',
        public priezvisko: string = '',
        public titul: string = '',
        public percento: string = '',
        public doktorand: string = '',
        public pracovisko: string = '',
        public ustav: string = '',
        public kontakt: string = '',
        public nazov: string = '',
        public preklad: string = '',
        public skkey: string = '',
        public engkey: string = '',
        public kategoria: string = '',
        public oblastVyskumu: string = '',
        public cislog: string = '',
        public nazovg: string = '',
        public doplnokg: string = '',
        public projektg: string = '',
        public agenturag: string = '',
        public www: string = '',
        public typ: string = '',
        public rok: string = '',
        public rozsah: string = '',
        public isn: string = '',
        public datum: string = '',
        public code: string = '',
        public vstup: string = '',
        public mon_miesto: string = '',
        public mon_vydavatelstvo: string = '',
        public mon_rok: string = '',
        public mon_rozsah: string = '',
        public mon_pocetah: string = '',
        public mon_isbn: string = '',
        public kap_zdroj: string = '',
        public kap_miesto: string = '',
        public kap_vydavatelstvo: string = '',
        public kap_rok: string = '',
        public kap_pocetah: string = '',
        public kap_od: string = '',
        public kap_do: string = '',
        public kap_isbn: string = '',
        public cas_zdroj: string = '',
        public cas_rocnik: string = '',
        public cas_cislo: string = '',
        public cas_rok: string = '',
        public cas_od: string = '',
        public cas_do: string = '',
        public cas_issn: string = '',
        public cas_krajina: string = '',
        public konf_nazov: string = '',
        public konf_miesto: string = '',
        public konf_cislo: string = '',
        public konf_datum: string = ''
        ){}

        public static clone(publication: Publication){
            return new Publication(
                publication.meno,
                publication.priezvisko,
                publication.titul,
                publication.percento,
                publication.doktorand,
                publication.pracovisko,
                publication.ustav,
                publication.kontakt,
                publication.nazov,
                publication.preklad,
                publication.skkey,
                publication.engkey,
                publication.kategoria,
                publication.oblastVyskumu,
                publication.cislog,
                publication.nazovg,
                publication.doplnokg,
                publication.projektg,
                publication.agenturag,
                publication.www,
                publication.typ,
                publication.typ,
                publication.rozsah,
                publication.isn,
                publication.datum,
                publication.code,
                publication.vstup,
                publication.mon_miesto,
                publication.mon_vydavatelstvo,
                publication.mon_rok,
                publication.mon_rozsah,
                publication.mon_pocetah,
                publication.mon_isbn,
                publication.kap_zdroj,
                publication.kap_miesto,
                publication.kap_vydavatelstvo,
                publication.kap_rok,
                publication.kap_pocetah,
                publication.kap_od,
                publication.kap_do,
                publication.kap_isbn,
                publication.cas_zdroj,
                publication.cas_rocnik,
                publication.cas_cislo,
                publication.cas_rok,
                publication.cas_od,
                publication.cas_do,
                publication.cas_issn,
                publication.cas_krajina,
                publication.konf_nazov,
                publication.konf_miesto,
                publication.konf_cislo,
                publication.konf_datum
            );
        }
}
